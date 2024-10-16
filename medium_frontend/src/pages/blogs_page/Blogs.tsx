import { useState, useEffect } from "react";
import { AppBar } from "../../components/AppBar"
import { fetchBlogs } from "./api";
import { BlogCard } from "./components/BlogCard"
import { BlogsType } from "./api";
import { BlogCardLoadingUi } from "./components/BlogCardLoadingUi";

export const Blogs = () => {
    const [isLoading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogsType>({
        message: "",
        post: [],
        status: false
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBlogs()
            .then(response => {
                const [data, err] = response
                if(!data)return
                if (err) {
                    setError(err?.message)
                } else if (!data.post) {            
                    setError(data.message)
                return 
            }  
            setBlogs(data)
            setLoading(false) 
            })
    }, [])

    if (error) {
        return <div>Error: {error}</div>
    }



    return <div>        
        <div>
            <AppBar  buttonText="Create Blog" authorName={"authorName"} />
        </div>
        <div className="flex justify-center flex-col items-center">
            {isLoading?<div className="items-center "><BlogCardLoadingUi/></div>:<div></div>}
        </div>
        <div>
            {error?<div>{error}</div>:<div></div>}
        </div>
        <div className="flex justify-center flex-col items-center">
            {blogs.post.map((blog, idx) => {
                return <div className="items-center" key={idx}>
                    <BlogCard id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={"3 dec, 2023"} key={idx} />
                </div>
            })}
        </div>
    </div>
}