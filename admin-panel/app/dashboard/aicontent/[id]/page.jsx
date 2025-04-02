import { updateAiContent } from "@/app/lib/actions";  
import { fetchAiContent } from "@/app/lib/data";  
import styles from "@/app/ui/dashboard/aicontent/addSingleaicontent/addsinglecontent.module.css";  
import Image from "next/image";

const SingleAiContentPage = async ({ params }) => {
  const { id } = params;
  const aiContent = await fetchAiContent(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={aiContent.imageUrl || "/noimage.png"} alt="" fill />
        </div>
        {aiContent.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateAiContent} className={styles.form}>
          <input type="hidden" name="id" value={aiContent.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={aiContent.title} />
          <label>Description</label>
          <input type="text" name="description" placeholder={aiContent.description} />
          <label>Content</label>
          <textarea name="content" placeholder={aiContent.content}></textarea>
          <label>Image URL</label>
          <input type="text" name="imageUrl" placeholder={aiContent.imageUrl} />
          <label>Link</label>
          <input type="text" name="link" placeholder={aiContent.link} />
          <label>Type</label>
          <select name="type" id="type">
            <option value="code" selected={aiContent.type === 'code'}>Code</option>
            <option value="image" selected={aiContent.type === 'image'}>Image</option>
            <option value="audio" selected={aiContent.type === 'audio'}>Audio</option>
            <option value="video" selected={aiContent.type === 'video'}>Video</option>
            <option value="business" selected={aiContent.type === 'business'}>Business</option>
            <option value="other" selected={aiContent.type === 'other'}>Other</option>
          </select>
          <label>Price Type</label>
          <select name="priceType" id="priceType">
            <option value="free" selected={aiContent.priceType === 'free'}>Free</option>
            <option value="paid" selected={aiContent.priceType === 'paid'}>Paid</option>
          </select>
          <label>Rating</label>
          <input type="number" name="rating" placeholder={aiContent.rating} min="0" max="5" step="0.1" />
          <label>Review</label>
          <textarea name="review" placeholder={aiContent.review}></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleAiContentPage;
