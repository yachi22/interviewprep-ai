import { useEffect, useState } from "react";
import { getCompanies } from "../api/companyApi";
import { useNavigate } from "react-router-dom";
export default function CompanyQuestions() {
  const [companies, setCompanies] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    async function loadCompanies() {
      try {
        const response = await getCompanies();
        setCompanies(response.data.companies);
      } catch (error) {
        console.error(error);
      }
    }

    loadCompanies();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Company Questions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
  key={company.id}
  onClick={() => navigate(`/company/${company.id}`)}
  className="bg-white rounded-xl shadow p-6 border hover:shadow-lg hover:cursor-pointer transition"
>
            <h2 className="text-xl font-semibold">
              {company.name}
            </h2>

            <p className="text-slate-500 mt-2">
              {company.description || "No description available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}