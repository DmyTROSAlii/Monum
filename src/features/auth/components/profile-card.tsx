"use client";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "lucide-react";

import { Separator } from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Profile } from "../types";
import { updateProfileScheme } from "../schemas";

import { useUpdateProfile } from "../api/use-update-profile";
import { useDeleteProfile } from "../api/use-delete-profile";

interface ProfileCardProps {
  onCancel?: () => void;
  initialValues: Profile;
};

export const ProfileCard = ({ onCancel, initialValues }: ProfileCardProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateProfile();
  const { mutate: deleteProfile, isPending: isDeletingProfile } = useDeleteProfile();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Profile`s Data",
    "This action cannot be undone.",
    "destructive",
  );

  const form = useForm<z.infer<typeof updateProfileScheme>>({
    resolver: zodResolver(updateProfileScheme),
    defaultValues: {
      ...initialValues,
    },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteProfile({
      param: { profileId: initialValues.id },
    }, {
      onSuccess: () => {
        window.location.href = "/";
      },
    });
  };

  const onSubmit = (values: z.infer<typeof updateProfileScheme>) => {
    const finalValues = {
      ...values,
    };

    mutate({
      form: finalValues,
      param: { profileId: initialValues.id }
    });

    window.location.href = "/";
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button size="sm" variant="secondary" onClick={onCancel ? onCancel : () => router.push(`/`)}>
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            Profile Settings
          </CardTitle>
        </CardHeader>
        <div className="px-2 mx-8 h-0.5 bg-gray-200">
          <Separator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Profile Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={initialValues.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="px-7 my-8 h-0.5 bg-gray-200">
                <Separator />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="dark:text-neutral-200"
                >
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <h3 className="text-bold">Change Email</h3>
          <p className="text-sm text-muted-foreground">
            To change your email, you must confirm your password.
          </p>
          <div className="my-8 h-0.5 bg-gray-200">
            <Separator />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={initialValues.email}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter password for change email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="px-7 my-8 h-0.5 bg-gray-200">
                <Separator />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="dark:text-neutral-200"
                >
                  Save email
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-wull border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Clear a profile`s data is irreversible and will remove all associated data.
            </p>
            <div className="my-8 h-0.5 bg-gray-200">
              <Separator />
            </div>
            <Button
              className="w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isDeletingProfile}
              onClick={handleDelete}
            >
              Clear Profile`s Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};