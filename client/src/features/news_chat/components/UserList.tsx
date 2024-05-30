import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { CancelButton, SearchContainer, SearchInput, UserIcon, UserItem, UserListContainer, UserName, UserNotFoundMessage } from '../../../app/common/styledComponents/chat';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useLocation, useNavigate } from 'react-router-dom';
import User from '../../../app/models/User';
import { useGetStaffQuery } from '../../../app/APIs/accountApi';
import { useGetDoctorsQuery } from '../../../app/APIs/doctorApi';
import { useGetNursesQuery } from '../../../app/APIs/nurseApi';
import { RootState } from '../../../app/storage/redux/store';
import useErrorHandler from '../../../app/helpers/useErrorHandler';
import { setSearchTerm } from '../../../app/storage/redux/searchSlice';
import Doctor from '../../../app/models/Doctor';
import Nurse from '../../../app/models/Nurse';

function UserList({ setSelectedUser }: { setSelectedUser: (user: User | null) => void }) {
    const { data: users, isLoading, error, isError } = useGetStaffQuery(null);
    const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: nurses, isLoading: nursesLoading, error: nursesError } = useGetNursesQuery(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
    const [userNotFound, setUserNotFound] = useState(false);

    const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

    useEffect(() => {
        if (users) {
            setDisplayedUsers(users);
        }
    }, [users]);

    useEffect(() => {
        if (users) {
            if (searchTerm === '') {
                setDisplayedUsers(users);
                setUserNotFound(false);
            } else {
                const results = users.filter((user: User) =>
                    `${user.name} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setDisplayedUsers(results);
                setUserNotFound(results.length === 0);
            }
        }
    }, [searchTerm, users]);

    if (isLoading || doctorsLoading || nursesLoading) {
        const fbError = error as FetchBaseQueryError;
        const fbDoctorsError = doctorsError as FetchBaseQueryError;
        const fbNursesError = nursesError as FetchBaseQueryError;
        useErrorHandler(fbError || fbDoctorsError || fbNursesError, navigate, location.pathname);
        return <div>Error loading data</div>;
    } 
    if (isError || doctorsError || nursesError) return <div>Error loading data</div>;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
    };

    return (
        <UserListContainer>
            <SearchContainer>
                <SearchInput
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search staff"
                />
                {searchTerm && (
                    <CancelButton onClick={() => dispatch(setSearchTerm(''))}>
                        Cancel
                    </CancelButton>
                )}
            </SearchContainer>
            {displayedUsers.map((user: User) => {
                const isDoctor = doctors.some((doctor: Doctor) => doctor.id === user.id);
                const isNurse = nurses.some((nurse: Nurse) => nurse.id === user.id);
                return (
                    <UserItem key={user.id} onClick={() => setSelectedUser(user)}>
                        <UserIcon>
                            {isDoctor && <FontAwesomeIcon icon={faUserDoctor} />}
                            {isNurse && !isDoctor && <FontAwesomeIcon icon={faUserNurse} />}
                        </UserIcon>
                        <UserName>
                            {isDoctor && "Dr. "}
                            {isNurse && !isDoctor && "Nurse. "}
                            {user.name} {user.lastName}
                        </UserName>
                    </UserItem>
                );
            })}
            {userNotFound && <UserNotFoundMessage>User not found</UserNotFoundMessage>}
        </UserListContainer>
    );
};

export default UserList;
