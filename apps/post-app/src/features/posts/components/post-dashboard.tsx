"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@monorepo/ui/components/alert";
import { Badge } from "@monorepo/ui/components/badge";
import { Button } from "@monorepo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@monorepo/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@monorepo/ui/components/form";
import { Input } from "@monorepo/ui/components/input";
import { Switch } from "@monorepo/ui/components/switch";
import { Textarea } from "@monorepo/ui/components/textarea";
import { useForm } from "react-hook-form";
import { useCreatePost } from "@/src/features/posts/hooks/use-create-post";
import { usePostList } from "@/src/features/posts/hooks/use-post-list";
import { useTogglePublication } from "@/src/features/posts/hooks/use-toggle-publication";
import {
  createPostInputSchema,
  type CreatePostInput
} from "@/src/features/posts/schemas/post-schema";
import { APP_CONFIG } from "@/src/shared/config/app-config";

/**
 * Dashboard displaying the create post form and posts table.
 */
export function PostDashboard(): JSX.Element {
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostInputSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false
    }
  });

  const { data: posts, isPending: isLoadingPosts, error: postsError } = usePostList();
  const { createPost, isCreating, error: createError } = useCreatePost();
  const { togglePublication, isToggling, activePostId } = useTogglePublication();

  const handleSubmit = form.handleSubmit(async (values) => {
    await createPost(values);
    form.reset({ title: "", content: "", published: false });
  });

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{APP_CONFIG.name}</h1>
        <p className="text-muted-foreground">
          Manage your posts with a fully typed stack powered by Next.js, tRPC, Prisma, and Tailwind CSS.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
          <CardDescription>Use the form below to add a new post to your collection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {createError ? (
            <Alert variant="destructive">
              <AlertTitle>Unable to create post</AlertTitle>
              <AlertDescription>{createError.message}</AlertDescription>
            </Alert>
          ) : null}
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My awesome post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share something insightful..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>Published</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Toggle to publish the post immediately.
                      </p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create post"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>Review your posts and toggle their published status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {postsError ? (
            <Alert variant="destructive">
              <AlertTitle>Unable to load posts</AlertTitle>
              <AlertDescription>{postsError.message}</AlertDescription>
            </Alert>
          ) : null}
          {isLoadingPosts ? (
            <p className="text-sm text-muted-foreground">Loading posts...</p>
          ) : posts && posts.length > 0 ? (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{post.title}</h2>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    {post.content ? (
                      <p className="text-sm text-muted-foreground">{post.content}</p>
                    ) : null}
                    <p className="text-xs text-muted-foreground">
                      Created on {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Switch
                    checked={post.published}
                    onCheckedChange={(checked) => void togglePublication(post.id, checked)}
                    disabled={isToggling && activePostId === post.id}
                    aria-label={`Toggle publication for ${post.title}`}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No posts yet. Create your first post above.</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
