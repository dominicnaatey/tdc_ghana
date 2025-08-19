import { useDashboardStats } from "@/lib/hooks/use-admin-data";
import { OverviewCard } from "./OverviewCard";
import { 
  NewspaperIcon, 
  HomeIcon, 
  MapIcon, 
  FolderIcon, 
  EnvelopeIcon 
} from "@/assets/icons";

export function OverviewCardsGroup() {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-[10px]"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <OverviewCard
        label="Total News"
        data={{
          value: stats?.totalNews || 0,
        }}
        Icon={NewspaperIcon}
      />

      <OverviewCard
        label="Housing Projects"
        data={{
          value: stats?.totalHousingProjects || 0,
        }}
        Icon={HomeIcon}
      />

      <OverviewCard
        label="Land Plots"
        data={{
          value: stats?.totalLandPlots || 0,
        }}
        Icon={MapIcon}
      />

      <OverviewCard
        label="Projects"
        data={{
          value: stats?.totalProjects || 0,
        }}
        Icon={FolderIcon}
      />

      <OverviewCard
        label="Inquiries"
        data={{
          value: stats?.totalInquiries || 0,
        }}
        Icon={EnvelopeIcon}
      />
    </div>
  );
}