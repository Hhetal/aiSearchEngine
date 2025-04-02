import { deleteAiContent } from "@/app/lib/actions";
import { fetchAiContents } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/aicontent/aicontent.module.css"; // Import CSS module
import Link from "next/link";
import Image from "next/image";

const AiContentPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, aiContents } = await fetchAiContents(q, page);  // Assuming fetchAiContent is set up to return paginated data

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for AI content..." />
        <Link href="/dashboard/aicontent/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Content</td>
            <td>Image URL</td>
            <td>Link</td>
            <td>Type</td>
            <td>Price Type</td>
            <td>Rating</td>
            <td>Review</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {aiContents.map((content) => {
           
            console.log('Total count:', count);

            return (
              <tr key={content.id}>
                <td>
                  <div className={styles.content}>
                    {/* <Image
                      src={content.imageUrl || "/image.png"}
                      alt="Content Image"
                      width={40}
                      height={40}
                      className={styles.contentImage}
                    /> */}
                    <Image
                      src={content.imageUrl?.startsWith("http") ? content.imageUrl : "/image.png"}
                      alt="Content Image"
                      width={40}
                      height={40}
                      className={styles.contentImage}
                    />

                    {content.title}
                  </div>
                </td>
                <td>{content.description}</td>
                <td>{content.content}</td>
                <td>{content.imageUrl}</td>
                <td>{content.link}</td>
                <td>{content.type}</td>
                <td>{content.priceType}</td>
                <td>{content.rating}</td>
                <td>{content.review}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/aicontent/${content.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form action={deleteAiContent}>
                      <input type="hidden" name="id" value={content.id} />
                      <button className={`${styles.button} ${styles.delete}`} type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default AiContentPage;
