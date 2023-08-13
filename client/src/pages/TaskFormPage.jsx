import { useForm } from "react-hook-form";
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Task updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#FFF",
        },
      });
    } else {
      await createTask(data);
      toast.success("Task created", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#FFF",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <textarea
          rows="3"
          placeholder="Description"
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>This field is required</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Are you sure?");
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Task deleted", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#FFF",
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
