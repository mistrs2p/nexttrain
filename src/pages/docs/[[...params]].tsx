import { useRouter } from "next/router";

export default function Doc() {
  const router = useRouter();
  const { params = [] } = router.query;
  // console.log(router);
  if (params?.length === 4) {
    return (
      <>
        <div>
          {params[0]} - {params[2]}
        </div>
      </>
    );
  }
  return <div>Docs Page</div>;
}
