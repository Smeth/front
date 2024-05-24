import StatCard from "@components/cards/StatCard"
import StatsBarCart from "@components/carts/StatsBarCart"
import StatsGeoCart from "@components/carts/StatsGeoCart"
import StatsPieCart from "@components/carts/StatsPieCart"

export default function Home() {
  return (
    <div className="w-full  ">
      <div className="w-full">
        <div className="w-full px-5 py-3 bg-primary-800/20 rounded border border-primary-800/30">
          <p className="text-primary-700 text-sm">{"This is a demo admin so you can't perform add, edit and delete action. Also image and file upload file managers are also disable in the demo."}</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4 md:gap-6 py-4">
        <StatCard 
          label="Langues"
          value="6"
          color="text-primary-900"
          link="#"
        />
        <StatCard 
          label="Genres"
          value="9"
          color="text-purple-900"
          link="#"
        />
        <StatCard 
          label="Films"
          value="33"
          color="text-primary-800"
          link="#"
        />
        <StatCard 
          label="Séries"
          value="12"
          color="text-blue-600"
          link="#"
        />
        <StatCard 
          label="Sports"
          value="20"
          color="text-green-500"
          link="#"
        />
        <StatCard 
          label="Live TV"
          value="12"
          color="text-yellow-700"
          link="#"
        />
        <StatCard 
          label="Utilisateurs"
          value="27"
          color="text-gray-500"
          link="#"
        />
        <StatCard 
          label="Transactions"
          value="12"
          color="text-yellow-900"
          link="#"
        />
        <StatCard 
          label="Langues"
          value="62"
          color="text-blue-900"
          link="#"
        />
        <StatCard 
          label="Langues"
          value="24"
          color="text-green-900"
          link="#"
        />
        <StatCard 
          label="Langues"
          value="12"
          color="text-primary-900"
          link="#"
        />
        <StatCard 
          label="Langues"
          value="12"
          color="text-purple-900"
          link="#"
        />
      </div>

      <div className="w-full bg-dark-800 rounded my-3 p-6">
        <StatsBarCart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:my-3">
        <div className="w-full bg-dark-800 rounded p-6 md:col-span-1">
          <StatsPieCart />
        </div>
        <div className="w-full bg-dark-800 rounded p-6 md:col-span-2">
          <StatsGeoCart />
        </div>
      </div>
    </div>
  )
}
