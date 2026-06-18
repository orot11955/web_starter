import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { DataTable } from '@/components/ui/data/DataTable/DataTable';
import { Pagination } from '@/components/ui/data/Pagination/Pagination';
import { DatePicker } from '@/components/ui/form/DatePicker/DatePicker';
import { FormField } from '@/components/ui/form/FormField/FormField';
import { Input } from '@/components/ui/Input/Input';
import { Page } from '@/components/ui/layout/Page/Page';
import { Panel } from '@/components/ui/layout/Panel/Panel';
import { Tabs } from '@/components/ui/navigation/Tabs/Tabs';
import { Drawer } from '@/components/ui/overlay/Drawer/Drawer';
import { Modal } from '@/components/ui/overlay/Modal/Modal';
import { Tooltip } from '@/components/ui/overlay/Tooltip/Tooltip';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import type { DataTableColumn } from '@/types/table';

type UserRow = {
  id: number;
  name: string;
  username: string;
  role: string;
  createdAt: string;
};

const sampleUsers: UserRow[] = [
  { id: 1, name: 'Admin', username: 'admin', role: 'ADMIN', createdAt: '2026-06-01' },
  { id: 2, name: 'User', username: 'user', role: 'USER', createdAt: '2026-06-02' },
];

export function UsersPage() {
  const toast = useToast();
  const { confirm } = useConfirm();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [createdDate, setCreatedDate] = useState<Date | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const columns = useMemo<DataTableColumn<UserRow>[]>(
    () => [
      { key: 'id', title: 'ID', width: '80px', align: 'center' },
      { key: 'name', title: 'Name' },
      { key: 'username', title: 'Username' },
      { key: 'role', title: 'Role' },
      { key: 'createdAt', title: 'Created' },
      {
        key: 'actions',
        title: 'Actions',
        align: 'right',
        render: () => (
          <Tooltip content="View user details">
            <Button type="button" size="sm" variant="secondary" onClick={() => setDrawerOpen(true)}>
              Details
            </Button>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  async function handleDelete() {
    const ok = await confirm({
      title: 'Delete user',
      message: 'Do you want to delete this user?',
      danger: true,
      confirmText: 'Delete',
    });

    if (ok) {
      toast.success('Deleted.');
    }
  }

  return (
    <Page>
      <Panel
        title="User Management"
        actions={
          <Button type="button" onClick={() => setModalOpen(true)}>
            New User
          </Button>
        }
      >
        <Tabs
          items={[
            {
              value: 'list',
              label: 'List',
              content: (
                <div className="users-page__content">
                  <div className="users-page__filters">
                    <FormField label="Keyword">
                      <Input
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder="Name or username"
                      />
                    </FormField>
                    <FormField label="Created date">
                      <DatePicker value={createdDate} onChange={setCreatedDate} />
                    </FormField>
                    <Button type="button" variant="secondary" onClick={() => toast.show('Search ready.')}>
                      Search
                    </Button>
                  </div>
                  <DataTable
                    columns={columns}
                    rows={sampleUsers}
                    rowKey={(row) => row.id}
                    onRowClick={() => setDrawerOpen(true)}
                  />
                  <Pagination page={page} pageSize={10} total={42} onChange={setPage} />
                </div>
              ),
            },
            {
              value: 'history',
              label: 'History',
              content: <p>User change history area.</p>,
            },
          ]}
        />
      </Panel>

      <Drawer
        open={drawerOpen}
        title="User Details"
        onClose={() => setDrawerOpen(false)}
        footer={
          <>
            <Button type="button" variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button type="button" onClick={() => toast.success('Saved.')}>
              Save
            </Button>
          </>
        }
      >
        <div className="users-page__detail">
          <FormField label="Name">
            <Input defaultValue="Admin" />
          </FormField>
          <FormField label="Username">
            <Input defaultValue="admin" />
          </FormField>
        </div>
      </Drawer>

      <Modal
        open={modalOpen}
        title="New User"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => toast.success('Created.')}>
              Create
            </Button>
          </>
        }
      >
        <div className="users-page__detail">
          <FormField label="Name" required>
            <Input />
          </FormField>
          <FormField label="Username" required>
            <Input />
          </FormField>
        </div>
      </Modal>
    </Page>
  );
}
