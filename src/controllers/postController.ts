import { Request, Response } from 'express';

import Post from '~/models/postModel';

/**
 * @description Get all of the posts
 * @route GET /api/v1/contacts
 * @access public
 */
export const getPosts = async (_: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * @description Get post
 * @route GET /api/v1/contacts/:id
 * @access public
 */
export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * @description Create post
 * @route POST /api/v1/contacts
 * @access public
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        status: 'fail',
        message: 'Fields are required',
      });
    }

    const newPost = await Post.create({
      title,
      description,
    });

    res.status(201).json({
      status: 'success',
      message: 'Post created successfully',
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * @description Update post
 * @route GET /api/v1/contacts/:id
 * @access public
 */
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById({ _id: id });

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        messag: 'Post not found',
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
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * @description Delete post
 * @route GET /api/v1/contacts/:id
 * @access public
 */
export const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
