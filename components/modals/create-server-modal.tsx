'use client';
import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadThing';
import FileUpload from '../fileUpload';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Server name is Required',
	}),
	imageUrl: z.string().min(1, {
		message: 'Server image is Required',
	}),
});

export default function CreateServerModal() {
	const { isOpen, onClose, type } = useModal();
	const isModalOpen = isOpen && type === 'createServer';
	const handleClose = () => {
		form.reset();
		onClose();
	};
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			imageUrl: '',
		},
	});

	const isloading = form.formState.isSubmitting;
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await axios.post('/api/servers', values);
			form.reset();
			router.refresh();
			onClose();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader className="flex flex-col items-center justify-center gap-3">
					<DialogTitle className="font-bold text-xl">
						Customize Your Server
					</DialogTitle>
					<DialogDescription className="text-center ">
						Give your new server a personality with a name and an icon. You can
						always change it later
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6"
					>
						<main className="flex flex-col items-center justify-center">
							<FormField
								control={form.control}
								name="imageUrl"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<FileUpload
												endpoint="serverImage"
												value={field.value}
												onChange={field.onChange}
											></FileUpload>
										</FormControl>
									</FormItem>
								)}
							/>
						</main>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs">SERVER NAME</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="w-full rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 "
										/>
									</FormControl>
									<FormMessage />
									<FormDescription className="text-xs">
										By Creating a Server, you agree to Discord&apos;s{' '}
										<a
											href="https://discord.com/guidelines"
											className="text-sky-500 font-semibold hover:underline"
										>
											Community Guidlines
										</a>
									</FormDescription>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								disabled={isloading}
								className="bg-indigo-500 text-white rounded-sm capitalize font-semibold hover:bg-indigo-500/90 "
							>
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
