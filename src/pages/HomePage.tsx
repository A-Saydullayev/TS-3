import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom"; // ← Добавь этот импорт!

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const getData = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
};

const HomePage = () => {
  const { data, error, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getData,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="relative">
          <div className="w-16 h-16 border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-xl text-gray-600 font-medium">Юкланмоқда...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <p className="text-xl text-red-600">
          Хатолик: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Users
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data!.map((user) => (
            <Link
              key={user.id}
              to={`/detail/${user.id}`}
              className="block transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col h-full cursor-pointer">
                <div className="flex justify-center pt-8 pb-4 bg-gray-50">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    alt={user.name}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                      {user.name}
                    </h3>
                    <p className="text-lg text-indigo-600 font-medium mb-3 text-center">
                      @{user.username}
                    </p>
                    <p className="text-sm text-gray-500 break-all leading-relaxed text-center">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
