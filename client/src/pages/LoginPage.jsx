import {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    useAppContext,
} from "../context/AppContext";

const LoginPage = () => {
    const navigate = useNavigate();

    const { loginUser } =
        useAppContext();

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        setLoading(true);

        setError("");

        const result =
            await loginUser(
                formData.email,
                formData.password
            );

        setLoading(false);

        if (result.success) {
            navigate("/dashboard");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg"
            >
                <h1 className="text-3xl font-bold mb-2 text-center">
                    Incident Platform
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Login to continue
                </p>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={
                            formData.password
                        }
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
                >
                    {loading
                        ? "Loading..."
                        : "Login"}
                </button>

                <p className="text-center mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;