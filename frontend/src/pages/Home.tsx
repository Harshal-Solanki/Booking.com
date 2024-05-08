import { useQuery } from "react-query";
import * as apiClient from "../api-clients";
import LatestDestinationCard from "../Components/LatestDestinationCard";

const Home = () => {
  const { data: hotelData } = useQuery("fetchQuery", () =>
    apiClient.fetchMyHotels()
  );

  const topRowHotels = hotelData?.slice(0,3) || [];
  const bottomRowHotels = hotelData?.slice(3,7) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;