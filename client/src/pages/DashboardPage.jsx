import {
    useEffect,
    useState,
} from "react";

import {
    useAppContext,
} from "../context/AppContext";

const DashboardPage = () => {
    const {
        user,
        incidents,
        fetchIncidents,
        createIncident,
        logout,
    } = useAppContext();

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [statusFilter,
        setStatusFilter] =
        useState("ALL");

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
        });

    useEffect(() => {
        const loadData = async () => {
            await fetchIncidents();

            setLoading(false);
        };

        loadData();
    }, []);

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

        const result =
            await createIncident(
                formData
            );

        if (result.success) {
            setFormData({
                title: "",
                description: "",
            });
        }
    };
    const filteredIncidents =
        incidents.filter((incident) => {
            const matchesSearch =
                incident.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "ALL"
                    ? true
                    : incident.status ===
                    statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* NAVBAR */}
            <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Incident Dashboard
                    </h1>

                    <p className="text-gray-500 text-sm">
                        Welcome, {user?.name}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="bg-black text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>

            <div className="p-6 grid lg:grid-cols-3 gap-6">
                {/* CREATE INCIDENT */}
                <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-4">
                        Create Incident
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Incident title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border p-3 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                                rows="5"
                                className="w-full border p-3 rounded-lg"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white p-3 rounded-lg"
                        >
                            Create Incident
                        </button>
                    </form>
                </div>

                {/* INCIDENTS */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">
                            Incidents
                        </h2>

                        <span className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                            {incidents.length} Total
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search incidents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="flex-1 border p-3 rounded-lg"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded-lg"
                        >
                            <option value="ALL">
                                All Status
                            </option>

                            <option value="OPEN">
                                OPEN
                            </option>

                            <option value="IN_PROGRESS">
                                IN PROGRESS
                            </option>

                            <option value="RESOLVED">
                                RESOLVED
                            </option>

                            <option value="CLOSED">
                                CLOSED
                            </option>
                        </select>
                    </div>
                    {loading ? (
                        <div className="bg-white p-6 rounded-2xl">
                            Loading incidents...
                        </div>
                    ) : incidents.length === 0 ? (
                        <div className="bg-white p-6 rounded-2xl">
                            No incidents found
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredIncidents.map(
                                (incident) => (
                                    <div
                                        key={incident.id}
                                        className="bg-white rounded-2xl shadow-sm p-5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold">
                                                    {
                                                        incident.title
                                                    }
                                                </h3>

                                                <p className="text-gray-600 mt-2">
                                                    {
                                                        incident.description
                                                    }
                                                </p>
                                            </div>

                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                                {
                                                    incident.status
                                                }
                                            </span>
                                        </div>

                                        <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-4">
                                            <span>
                                                Version:{" "}
                                                {
                                                    incident.version
                                                }
                                            </span>

                                            <span>
                                                {new Date(
                                                    incident.createdAt
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;