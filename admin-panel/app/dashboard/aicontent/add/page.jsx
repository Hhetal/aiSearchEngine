import { addAiContent } from "@/app/lib/actions";  
import styles from "@/app/ui/dashboard/aicontent/addaicontent/addaicontent.module.css";  

const AddAiContentPage = () => {
  return (
    <div className={styles.container}>
      <form action={addAiContent} className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <input type="text" placeholder="Description" name="description" required />
        <textarea
          name="content"
          rows="8"
          placeholder="Content"
          required
        ></textarea>
        <input type="text" placeholder="Image URL" name="imageUrl" />
        <input type="text" placeholder="Link" name="link" />
        
        <label>Type</label>
        <select name="type" id="type">
          <option value="code">Code</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>

        <label>Price Type</label>
        <select name="priceType" id="priceType">
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        <label>Rating</label>
        <input type="number" name="rating" placeholder="Rating (0-5)" min="0" max="5" step="0.1" />

        <textarea
          name="review"
          rows="8"
          placeholder="Review"
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAiContentPage;
