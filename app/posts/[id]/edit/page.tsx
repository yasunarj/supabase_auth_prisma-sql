type EditProps = {
  params: Promise<{ id: string }>;
};
import { getPost } from "../../getPost";
import EditForm from "./EditForm";

const EditPage = async (props: EditProps) => {
  const params = await props.params;
  const { id } = params;

  const post = await getPost(id);

  if (!post) {
    return (
      <div className="text-2xl text-center mt-20">投稿が見つかりません</div>
    );
  }
  return <EditForm post={post} />;
};

export default EditPage;
