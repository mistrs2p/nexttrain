import { useRouter } from "next/router";
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}
export default function Post({ product }: { product: Product }) {
  const router = useRouter();
  const productId = router.query.productId;
  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h1>Product Number {product.id}</h1>
      <div>{product.title}</div>
      <p>{product.description}</p>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  console.log(req.headers.cookie);
  res.setHeader("Set-Cookie", ["name=ali"]);
  const response = await fetch(`http://localhost:3004/products/${params.productId}`);
  const product = await response.json();
  console.log(`Generating page for /product/${params.productId}`);
  if (!product.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
    },
  };
}
