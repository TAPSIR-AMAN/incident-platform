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

const RegisterPage = () => {
    const navigate = useNavigate();

    const { registerUser } =
        useAppContext();

    const [formData, setFormData] =
        useState({
            companyName: "",
            name: "",
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
            await registerUser(
                formData
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
                    Create Account
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Setup your organization
                </p>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-2">
                        Company Name
                    </label>

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Acme Corp"
                        value={
                            formData.companyName
                        }
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                        required
                    />
                </div>

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
                        className="w-full border p-3 rounded-lg"
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
                        className="w-full border p-3 rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded-lg"
                >
                    {loading
                        ? "Loading..."
                        : "Register"}
                </button>

                <p className="text-center mt-6">
                    Already have account?{" "}
                    <Link
                        to="/"
                        className="text-blue-600"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;