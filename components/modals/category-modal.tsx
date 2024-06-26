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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import { ChannelType } from '@prisma/client';

const formSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: 'category name is required',
		})
		.refine((name) => name.toLocaleLowerCase() !== 'text', {
			message: 'Channel name cannot be "text"',
		})
		.refine((name) => name.toLocaleLowerCase() !== 'audio', {
			message: 'Channel name cannot be "audio"',
		})
		.refine((name) => name.toLocaleLowerCase() !== 'video', {
			message: 'Channel name cannot be "video"',
		}),
});

export default function CategoryModal() {
	const { isOpen, onClose, type, data } = useModal();
	const isModalOpen = isOpen && type === 'category';
	const handleClose = () => {
		form.reset();
		onClose();
	};
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	const isloading = form.formState.isSubmitting;
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// const res = await axios.post(
			// 	`/api/category?serverId=${data.server?.id}`,
			// 	values
			// );
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
						Create a Category
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs">CATEGORY NAME</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="w-full rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 "
											placeholder="Enter category name"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								disabled={isloading}
								className="bg-indigo-500 text-white rounded-sm capitalize font-semibold hover:bg-indigo-500/90 w-full"
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
