import Header from "@/components/Header";
import Head from "next/head";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A simple shopping cart app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center max-w-[1440px] w-full mx-auto">
        <Header />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}
