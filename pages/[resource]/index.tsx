import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { checkAuthentication } from "@pankod/refine-nextjs-router";

import dataProvider from "@pankod/refine-simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

import { authProvider } from "src/authProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, ...props } = await checkAuthentication(
    authProvider,
    context
  );

  if (!isAuthenticated) {
    return props;
  }

  const { query } = context;

  try {
    const data = await dataProvider(API_URL).getList({
      resource: query["resource"] as string,
    });

    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
