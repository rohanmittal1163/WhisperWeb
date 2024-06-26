'use client';
import React, { use, useEffect, useState } from 'react';
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
import { ChannelType } from '@prisma/client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
const formSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: 'Channel name is required',
		})
		.refine((name) => name !== 'general', {
			message: 'Channel name cannot be "general"',
		}),
	type: z.nativeEnum(ChannelType),
});

export default function ChannelEdit() {
	const { isOpen, onClose, type, data } = useModal();
	const isModalOpen = isOpen && type === 'editChannel';
	const handleClose = () => {
		form.reset();
		onClose();
	};
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data.channel?.name,
			type: data.channel?.type,
		},
	});

	useEffect(() => {
		if (data.channel?.type) {
			form.setValue('type', data.channel?.type);
		}
		if (data.channel?.name) {
			form.setValue('name', data.channel?.name);
		}
	}, [form, data.channel]);

	const isloading = form.formState.isSubmitting;
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await axios.put(
				`/api/channel/${data.channel?.id}?serverId=${data.server?.id}`,
				values
			);
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
					<DialogTitle className="font-bold text-xl">Edit Channel</DialogTitle>
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
									<FormLabel className="text-xs">CHANNEL NAME</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="w-full rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 "
											placeholder="Enter channel name"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="w-full rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 ">
									<FormLabel>Channel Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a Channel type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="TEXT">Text</SelectItem>
											<SelectItem value="AUDIO">Audio</SelectItem>
											<SelectItem value="VIDEO">Video</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								disabled={isloading}
								className="bg-indigo-500 text-white rounded-sm capitalize font-semibold hover:bg-indigo-500/90 w-full"
							>
								Edit
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
