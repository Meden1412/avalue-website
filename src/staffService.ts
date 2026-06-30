export type Staff = {
  slug: string;
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
  zalo: string;
  address: string;
  avatar: string;
  cover: string;
  website: string;
  bio: string;
  services: string[];
  active: boolean;
};

export async function getStaffList(): Promise<Staff[]> {
  const response = await fetch("/data/staff.json", {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Không tải được dữ liệu staff.json");
  }

  const data = await response.json();

  return data.filter((item: Staff) => item.active === true);
}

export async function getStaffBySlug(slug: string): Promise<Staff | null> {
  const staffList = await getStaffList();

  const found = staffList.find(
    (item) =>
      item.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  return found || null;
}