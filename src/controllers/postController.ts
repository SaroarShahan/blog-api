import { Request, Response } from 'express';

import Post from '~/models/postModel';
import asyncHandler from '~/utils/asynHandler';

/**
 * @description Get all of the posts
 * @route GET /api/v1/contacts
 * @access public
 */
export const getPosts = asyncHandler(async (_: Request, res: Response) => {
  const posts = await Post.find();

  res.status(200).json({
    status: 'success',
    data: {
      posts,
      meta: {
        counts: posts.length,
      },
    },
  });
});

/**
 * @description Get post
 * @route GET /api/v1/contacts/:id
 * @access public
 */
export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

/**
 * @description Create post
 * @route POST /api/v1/contacts
 * @access private
 */
export const createPost = asyncHandler(async (req: any, res: Response) => {
  const { title, description } = req.body;
  const { user } = req.user;

  if (!title || !description) {
    return res.status(400).json({
      status: 'fail',
      message: 'Fields are required',
    });
  }

  const newPost = await Post.create({
    title,
    description,
    author: user,
    userId: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Post created successfully',
    data: {
      post: newPost,
    },
  });
});

/**
 * @description Update post
 * @route GET /api/v1/contacts/:id
 * @access private
 */
export const updatePost = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;

  const post = await Post.findById({ _id: id });

  if (!post) {
    return res.status(404).json({
      status: 'fail',
      messag: 'Post not found',
      data: null,
    });
  }

  if (post.userId?._id.toString() !== req.user.id) {
    return res.status(401).json({
      status: 'fail',
      messag: "You don't have permission to update this post",
      data: null,
    });
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Post updated successfully',
    data: {
      post: updatedPost,
    },
  });
});

/**
 * @description Delete post
 * @route GET /api/v1/contacts/:id
 * @access private
 */
export const deletePost = asyncHandler(async (req: any, res: Response) => {
  const { id } = req.params;

  const post = await Post.findById({ _id: id });

  if (!post) {
    return res.status(404).json({
      status: 'fail',
      messag: 'Post not found',
      data: null,
    });
  }

  if (post.userId?._id.toString() !== req.user.id) {
    return res.status(401).json({
      status: 'fail',
      messag: "You don't have permission to update this post",
      data: null,
    });
  }

  await Post.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: 'Post deleted successfully',
    data: null,
  });
});
