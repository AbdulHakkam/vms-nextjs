import NavbarSide from "@/components/nav/nav-bar-side";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <NavbarSide />
      {children}
    </div>
  );
}
