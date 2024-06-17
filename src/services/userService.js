import usersApi from "../apis/usersApi";
import { rolesApi } from "../apis/usersApi";

const BASE_URL = '';

export const getAllRoles = async () => {
    try {
        const response = await rolesApi.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

export const findAll = async () => {
    try {
        const response = await usersApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const registerUser = async ({ username, email, password, firstName, lastName, birthDate, admin }) => {
    try {
        const formattedBirthDate = birthDate.split('-').reverse().join('/');
        return await usersApi.post(BASE_URL, {
            username,
            password,
            email,
            firstName,
            lastName,
            birthDate: formattedBirthDate,
            admin,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const save = async ({ username, email, password, roles }) => {
    try {
        const formattedRoles = roles.map((role) => ({ name: role }));
        return await usersApi.post(BASE_URL, {
            username,
            email,
            password,
            roles: formattedRoles,
        });
    } catch (error) {
        throw error;
    }
};

export const update = async ({ id, username, email, firstName, lastName, birthDate, roles, password }) => {
    try {
        const formattedRoles = roles.map((role) => ({ name: role }));
        const payload = { username, email, firstName, lastName, birthDate, roles: formattedRoles };
        if (password) {
            payload.password = password;
        }
        return await usersApi.put(`${BASE_URL}/${id}`, payload);
    } catch (error) {
        throw error;
    }
}
export const remove = async (id) => {
    try {
        await usersApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}
