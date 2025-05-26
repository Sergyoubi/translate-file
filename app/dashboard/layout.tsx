import Sidebar from "@/components/global/Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="w-screen h-screen flex-center">
      <Sidebar />
      <div className="w-[80%] h-full">{children}</div>
    </main>
  );
};

export default Layout;
