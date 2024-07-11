const FIREBASE_DOMAIN = "MY_DUMMY_DOMAIN";

export async function getAllPosts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/chirp.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch posts.");
  }

  const transformedPost = [];

  for (const key in data) {
    const postObj = {
      id: key,
      ...data[key],
    };

    transformedPost.push(postObj);
  }

  return transformedPost;
}

export async function getSinglePost(postId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/chirp/${postId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch post.");
  }

  const loadedPosts = {
    id: postId,
    ...data,
  };

  return loadedPosts;
}

export async function deleteSinglePost(postId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/chirp/${postId}.json`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Could not delete post.");
  }
}

export async function addPost(postData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/chirp.json`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create post.");
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.postId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment");
  }

  return { commentId: data.name };
}

export async function getAllComments(postId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${postId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
