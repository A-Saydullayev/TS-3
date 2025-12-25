import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
  website: string;
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

  const [searchName, setSearchName] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [filterType, setFilterType] = useState<"city" | "company" | "website">(
    "city"
  );

  const filteredUsers = data?.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    let matchesFilter = true;
    if (filterValue) {
      if (filterType === "city") {
        matchesFilter = user.address.city
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      } else if (filterType === "company") {
        matchesFilter = user.company.name
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      } else if (filterType === "website") {
        matchesFilter = user.website
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }
    }

    return matchesName && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="relative">
          <div className="w-16 h-16 border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
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
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Users
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Ism bo'yicha qidirish (masalan: Leanne)"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as "city" | "company" | "website")
              }
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="city">Shahar bo'yicha</option>
              <option value="company">Kompaniya bo'yicha</option>
              <option value="website">Website bo'yicha</option>
            </select>

            <input
              type="text"
              placeholder={
                filterType === "city"
                  ? "Shahar nomi"
                  : filterType === "company"
                  ? "Kompaniya nomi"
                  : "Website qismi (masalan: .biz)"
              }
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <p className="mt-4 text-right text-gray-600">
            Natijalar soni: <strong>{filteredUsers?.length}</strong>
          </p>
        </div>

        {filteredUsers && filteredUsers.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => (
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
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">
              Hech qanday foydalanuvchi topilmadi
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
