import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-5">
        <Search />
      </div>
    </>
  );
}
