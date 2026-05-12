import {
    createContext,
    useContext,
    useState,
} from "react";

import axios from "axios";

export const AppContext =
    createContext();

export const AppProvider = ({
    children,
}) => {
    // BASE URL
    const baseUrl =
        "https://incident-platform.onrender.com/api";

    // USER STATE
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    // INCIDENTS
    const [incidents, setIncidents] =
        useState([]);

    // TOKEN
    const token =
        localStorage.getItem("token");

    // AXIOS INSTANCE
    const api = axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: token
                ? `Bearer ${token}`
                : "",
        },
    });

    // LOGIN
    const loginUser = async (
        email,
        password
    ) => {
        try {
            const { data } = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setUser(data.user);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message,
            };
        }
    };

    // REGISTER
    const registerUser = async (
        formData
    ) => {
        try {
            const { data } = await api.post(
                "/auth/register",
                formData
            );

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setUser(data.user);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message,
            };
        }
    };

    // GET INCIDENTS
    const fetchIncidents =
        async () => {
            try {
                const { data } = await api.get(
                    "/incidents"
                );

                setIncidents(data.incidents);
            } catch (error) {
                console.log(error);
            }
        };

    // CREATE INCIDENT
    const createIncident =
        async (incidentData) => {
            try {
                await api.post(
                    "/incidents",
                    incidentData
                );

                fetchIncidents();

                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                };
            }
        };

    // LOGOUT
    const logout = () => {
        localStorage.clear();

        setUser(null);

        window.location.href = "/";
    };

    const value = {
        baseUrl,

        user,
        setUser,

        incidents,
        setIncidents,

        loginUser,
        registerUser,

        fetchIncidents,
        createIncident,

        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () =>
    useContext(AppContext);