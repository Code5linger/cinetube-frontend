'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  changeUserRole,
  changeUserStatus,
  deleteUser,
  fetchAdminUsers,
} from '@/services/admin.service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { SessionUser } from '@/types/user.types';
import type { AccountStatus, Role } from '@/types/domain.types';
import { useSession } from '@/hooks/useSession';

export default function AdminUsersPage() {
  const { data: me } = useSession();
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => (await fetchAdminUsers()).data as SessionUser[],
  });

  const mStatus = useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: AccountStatus;
    }) => changeUserStatus(userId, status),
    onSuccess: () => {
      toast.success('Status updated');
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const mRole = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: Role }) =>
      changeUserRole(userId, role),
    onSuccess: () => {
      toast.success('Role updated');
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const mDel = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      toast.success('User deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (q.isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const users = q.data ?? [];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <p className="mt-2 text-muted-foreground">
        {users.length} registered user{users.length !== 1 ? 's' : ''}. You
        cannot delete or block yourself.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name ?? '—'}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{u.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      (u.accountStatus ?? 'ACTIVE') === 'ACTIVE'
                        ? 'outline'
                        : 'destructive'
                    }
                  >
                    {u.accountStatus ?? 'ACTIVE'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(u.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={u.id === me?.id || mRole.isPending}
                      onClick={() =>
                        mRole.mutate({
                          userId: u.id,
                          role: u.role === 'ADMIN' ? 'USER' : 'ADMIN',
                        })
                      }
                    >
                      Toggle role
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={u.id === me?.id || mStatus.isPending}
                      onClick={() =>
                        mStatus.mutate({
                          userId: u.id,
                          status:
                            u.accountStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE',
                        })
                      }
                    >
                      Toggle status
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={u.id === me?.id || mDel.isPending}
                      onClick={() => {
                        if (
                          confirm(
                            'Delete this user permanently? This cannot be undone.',
                          )
                        )
                          mDel.mutate(u.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
