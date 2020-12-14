---
title: Patterns for Serving Large Models
date: "2020-12-15T12:00:00.000Z"
template: "post"
draft: false
slug: "/programming/serving-large-models"
img: "https://amols.blog/media/serving-models-pattern-1.png"
isML: false
category: "Programming"
tags:
  - "Programming" 
  - "Memory Management"
  - "Machine Learning"
description: "Memory Patterns for serving large machine learning models at scale"
canonical: ''
prev: "/programming/fast-wire-formats"
next: "/product-led-growth/ship-products-faster"
discussLinkTwitter: ''
discussLinkHN: ''
discussLinkReddit: ''
asyncScript: ''
usesKatex: ''
dateModified: ''
isWeb: ''
twitterEmbed: ''
---

Model Inference is process of serving or running predictions with machine learning models. When serving large deep learning models, one prominent and open question happens to be around memory managment .  This post outlines two patterns that library builders can use, essentially to achieve a higher cost to performance ratio.

#### Pattern I

In this pattern, a memory allocator pulls models in and out of memory.  RAM is used as cache so some requests will have to live with latency due to dynamic allocation. 

![Serving Models Pattern I](/media-link/serving-models-pattern-1.png)

Adding more instances with a load balancer will ensure wider coverage of models.  Caching the load balancer requests will be additional bonus that will lead to better cache hits on model servers.

[Multi-model server](https://github.com/awslabs/multi-model-server) is capable of doing a part of above. Though it seems to support only one model per instance at a time. 


#### Pattern II

Not everyone can afford memory. A further optimisation can be achieved by using mmap. 

Memory mapped files are often used when working with really large files.  The caller gets an end less view of file but only the desired section of the file are loaded into memory.  

Let’s say we have a 10gb file.  When this file is opened using mmap (python) and we want to read first 100bytes, the operating system will check if the requested byte range exists in page cache and when its not found the page fault is raised to bring the relevant bytes into memory. 

![Serving Models Pattern II](/media-link/serving-models-pattern-2.jpeg)

To make this approach work for model inference, we may have to relook at on-disk model formats from locality perspective (colocate neighbouring layers for efficient reads). 

I found tensorflow issues (GitHub) for supporting mmap for android and edge devices.  [Pete Warden](https://petewarden.com/) has an exellent blog on running models on tiny devices. Optimistic about more work in this direction.

Serverless is the future of model inference and given the memory limits imposed by the cloud vendors, the above patterns surely have a bright future.


