import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const fetchUser = async (id: string): Promise<User> => {
  const { data } = await axios.get<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return data;
};

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
          <div className="w-16 h-16 border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-2xl font-semibold text-gray-800 mb-4">
          User not found
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8 transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className=" bg-blue-600 px-8 py-12 text-center">
            <h1 className="mt-6 text-3xl font-bold text-white">{user.name}</h1>
            <p className="mt-2 text-lg text-indigo-100">@{user.username}</p>
          </div>

          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium break-all">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Address
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Company
              </h2>
              <p className="text-lg font-semibold text-gray-900">
                {user.company.name}
              </p>
              <p className="text-gray-600 italic mt-2">
                "{user.company.catchPhrase}"
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
