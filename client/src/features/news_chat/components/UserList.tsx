import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faUserDoctor, faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { CancelButton, SearchContainer, SearchInput, UserIcon, UserItem, UserListContainer, UserName, UserNotFoundMessage } from '../../../app/common/styledComponents/chat';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';
import User from '../../../app/models/User';
import { useGetStaffQuery } from '../../../app/APIs/accountApi';
import { useGetDoctorsQuery } from '../../../app/APIs/doctorApi';
import { useGetNursesQuery } from '../../../app/APIs/nurseApi';
import { RootState } from '../../../app/storage/redux/store';
import { setSearchTerm } from '../../../app/storage/redux/searchSlice';
import Doctor from '../../../app/models/Doctor';
import Nurse from '../../../app/models/Nurse';
import MainLoader from '../../../app/common/MainLoader';
import { Header, SidePanel } from '../../../app/layout';
import { BackButton, ErrorIcon, ErrorMessage, ErrorTitleRow, Message } from '../../../app/common/styledComponents/table';

function UserList({ setSelectedUser }: { setSelectedUser: (user: User | null) => void }) {
    const { data: users, isLoading, error } = useGetStaffQuery(null);
    const { data: doctors, isLoading: doctorsLoading, error: doctorsError } = useGetDoctorsQuery(null);
    const { data: nurses, isLoading: nursesLoading, error: nursesError } = useGetNursesQuery(null);

    const navigate = useNavigate();
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

        return (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    }
    else if (error || doctorsError || nursesError) {
        const errorMessage = ((error as FetchBaseQueryError)?.data || (doctorsError as FetchBaseQueryError)?.data || (nursesError as FetchBaseQueryError)?.data) as string;

        return (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <Message>{errorMessage}</Message>
                    </ErrorTitleRow>
                    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                </ErrorMessage>
            </>
        );
    }

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
