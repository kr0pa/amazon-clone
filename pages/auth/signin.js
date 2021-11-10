import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
// import Header from "../../components/Header";

function signin({ providers }) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center bg-[#3d3434] h-screen">
      {/* <Header /> */}

      <div className="flex flex-col items-center justify-center -mt-56 h-screen">
        <img
          onClick={() => router.push("/")}
          className="w-80 cursor-pointer"
          src="https://links.papareact.com/f90"
          alt=""
        />

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 p-3 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
