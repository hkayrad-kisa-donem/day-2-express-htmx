const express = require("express");
const router = express.Router();

const defaultPosts = [
  { id: 1, title: "Post 1", body: "This is post 1" },
  { id: 2, title: "Post 2", body: "This is post 2" },
  { id: 3, title: "Post 3", body: "This is post 3" },
  { id: 4, title: "Post 4", body: "This is post 4" },
  { id: 5, title: "Post 5", body: "This is post 5" },
  { id: 6, title: "Post 6", body: "This is post 6" },
];

const dataStore = function () {
  var posts = [
    { id: 1, title: "Post 1", body: "This is post 1" },
    { id: 2, title: "Post 2", body: "This is post 2" },
    { id: 3, title: "Post 3", body: "This is post 3" },
    { id: 4, title: "Post 4", body: "This is post 4" },
    { id: 5, title: "Post 5", body: "This is post 5" },
    { id: 6, title: "Post 6", body: "This is post 6" },
  ];

  return {
    //? FOR DEBUGGING PURPOSES
    // It doesn't only revert posts, it re-initializes the data variable
    restorePosts: () => {
      data = dataStore();
    },

    getPosts: () => {
      return posts;
    },

    deletePost: (postId) => {
      if (!postId) {
        throw new Error("Invalid post ID");
      }

      posts = posts.filter((post) => post.id !== postId);
      return postId;
    },
  };
};

var data = dataStore();

//? FOR DEBUGGING PURPOSES
router.get("/api/v1/posts/restore", (req, res) => {
  data.restorePosts();
  res.send("Posts restored");
});

router.get("/api/v1/posts", (req, res) => {
  var postsTable = "<table><tr><th>ID</th><th>Title</th><th>Body</th></tr>";
  data.getPosts().forEach((post) => {
    postsTable += `<tr hx-target='next #status' hx-delete='/api/v1/posts/${post.id}/delete'>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                  </tr>`;
  });
  postsTable += "</table><span id='status'></span>";

  res.status(200).send(postsTable);
});

router.delete("/api/v1/posts/:id/delete", (req, res) => {
  const postId = req.params.id;
  const deletedPostId = data.deletePost(parseInt(postId));
  console.log(`Post ${deletedPostId} deleted`);
  res.status(200).send(`Post ${deletedPostId} deleted`);
});

module.exports = router;
