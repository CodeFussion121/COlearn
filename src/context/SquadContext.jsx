import React, { createContext, useState, useContext, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayUnion, query, collection, where, getDocs, limit, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const SquadContext = createContext();

export const useSquad = () => useContext(SquadContext);

export const SquadProvider = ({ children }) => {
    const [squad, setSquad] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!auth) return;
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && db) {
                // Listen to user's squadId change
                const userRef = doc(db, 'users', currentUser.uid);
                const unsubscribeUser = onSnapshot(userRef, (userSnap) => {
                    const userData = userSnap.data();
                    if (userData?.squadId) {
                        // Listen to squad data
                        const squadRef = doc(db, 'squads', userData.squadId);
                        const unsubscribeSquad = onSnapshot(squadRef, (squadSnap) => {
                            if (squadSnap.exists()) {
                                setSquad({ id: squadSnap.id, ...squadSnap.data() });
                            }
                        });
                        return () => unsubscribeSquad();
                    } else {
                        setSquad(null);
                    }
                });
                return () => unsubscribeUser();
            } else {
                setSquad(null);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    const findSquad = async (userData) => {
        setLoading(true);
        try {
            // AI Matching Simulation: Query for squads with space
            const squadsRef = collection(db, 'squads');
            const q = query(squadsRef, where('memberCount', '<', 5), limit(1));
            const querySnapshot = await getDocs(q);

            let squadId;
            if (querySnapshot.empty) {
                // Create new squad
                const newSquad = {
                    name: 'Project ' + (Math.random() + 1).toString(36).substring(7).toUpperCase(),
                    members: [{ uid: user.uid, name: user.displayName, avatar: user.photoURL }],
                    memberCount: 1,
                    genre: userData.interests?.[0] || 'General Learning',
                    xp: 0,
                    createdAt: new Date().toISOString()
                };
                const docRef = await addDoc(collection(db, 'squads'), newSquad);
                squadId = docRef.id;
            } else {
                // Join existing
                const targetSquad = querySnapshot.docs[0];
                squadId = targetSquad.id;
                await updateDoc(doc(db, 'squads', squadId), {
                    members: arrayUnion({ uid: user.uid, name: user.displayName, avatar: user.photoURL }),
                    memberCount: targetSquad.data().memberCount + 1
                });
            }

            // Update user's squadId
            await updateDoc(doc(db, 'users', user.uid), { squadId });
        } catch (error) {
            console.error("Find squad failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const leaveSquad = async () => {
        if (!user || !squad) return;
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), { squadId: null });
            // In a real app, also remove from squad members array in Firestore
        } catch (error) {
            console.error("Leave squad failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SquadContext.Provider value={{ squad, findSquad, leaveSquad, loading }}>
            {children}
        </SquadContext.Provider>
    );
};
