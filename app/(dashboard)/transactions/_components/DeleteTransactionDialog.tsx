'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';
import { DeleteTransaction } from '../_actions/deleteTransaction';


interface Props {
    open: boolean,
    setOpen: (open:boolean) => void,
    transactionId: string,
}

function DeleteTransactionDialog({open, setOpen, transactionId} : Props) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeleteTransaction,
        onSuccess: async () => {
            toast.success("Transaction deleted successfully 🎉", {
                id: transactionId
            });
            await queryClient.invalidateQueries({
                queryKey: ['transaction'],
            });
        },
        onError: () => {
            toast.error("Something went wrong", {
                id: transactionId,
            });
        },
    });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent aria-describedby='Dialog to delete the transaction.'>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This action can not be undone. This will permanently delete you transaction!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                      toast.loading("Deletign transaction...", {
                        id: transactionId,
                      });
                      deleteMutation.mutate(transactionId);
                    }}
                >Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionDialog
