import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}
// export default function Posts({ posts }: { posts: Post[] }) {
export default function ProductList({ productList }: { productList: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState(productList);
  const fetchFoodProduct = async () => {
    const response = await fetch("http://localhost:3004/products?category=food");
    const products = await response.json();
    setProducts(products);
    router.push("products?category=food", undefined, { shallow: true });
  };
  return (
    <>
      <button onClick={fetchFoodProduct}>Food Products</button>
      <h1>List of Products</h1>
      <hr />
      <ul>
        {products?.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                {product.id} - {product.title} - {product.price} - {product.category}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  // const { query } = context;
  // const { category } = query;
  // const queryString = category ? "category=food" : "";
  // OR
  const { resolvedUrl } = context;

  console.log(context);
  const response = await fetch(`http://localhost:3004${resolvedUrl}`);
  const productList = await response.json();
  return {
    props: {
      productList,
    },
  };
};
