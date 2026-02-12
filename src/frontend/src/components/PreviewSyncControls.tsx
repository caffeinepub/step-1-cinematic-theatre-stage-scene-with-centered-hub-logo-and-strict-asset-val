import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, RotateCw, Settings, Upload } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validatePublishSlug, getDefaultPublishSlug } from '@/utils/publishSlug';

interface PreviewSyncControlsProps {
  onRefresh: () => void;
  onResync: () => void;
  onPublish?: (slug: string) => void;
}

export function PreviewSyncControls({ onRefresh, onResync, onPublish }: PreviewSyncControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishClick = () => {
    // Initialize with the default slug
    const defaultSlug = getDefaultPublishSlug();
    setSlug(defaultSlug);
    setError(undefined);
    setIsOpen(false);
    setIsPublishDialogOpen(true);
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    // Clear error when user starts typing
    if (error) {
      setError(undefined);
    }
  };

  const handlePublish = async () => {
    // Validate the slug
    const result = validatePublishSlug(slug, true);
    
    if (!result.valid) {
      setError(result.error);
      return;
    }
    
    if (!result.slug) {
      setError('Invalid slug generated.');
      return;
    }

    // Call the publish handler if provided
    if (onPublish) {
      setIsPublishing(true);
      try {
        await onPublish(result.slug);
        setIsPublishDialogOpen(false);
        setSlug('');
        setError(undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Publish failed');
      } finally {
        setIsPublishing(false);
      }
    } else {
      // No publish handler provided, just close
      setIsPublishDialogOpen(false);
      setSlug('');
      setError(undefined);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-gray-900/90 border-gray-700 hover:bg-gray-800 backdrop-blur-sm shadow-lg"
            >
              <Settings className="h-5 w-5 text-gray-300" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            className="w-64 bg-gray-900/95 border-gray-700 backdrop-blur-sm"
          >
            <div className="space-y-3">
              <div className="text-sm font-semibold text-white mb-3">
                Preview Controls
              </div>
              <Button
                onClick={() => {
                  onRefresh();
                  setIsOpen(false);
                }}
                variant="outline"
                className="w-full justify-start gap-2 bg-gray-950 border-gray-700 hover:bg-gray-800 text-white"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Assets
              </Button>
              <Button
                onClick={() => {
                  onResync();
                  setIsOpen(false);
                }}
                variant="outline"
                className="w-full justify-start gap-2 bg-gray-950 border-gray-700 hover:bg-gray-800 text-white"
              >
                <RotateCw className="h-4 w-4" />
                Rebuild Preview
              </Button>
              <Button
                onClick={handlePublishClick}
                variant="outline"
                className="w-full justify-start gap-2 bg-gray-950 border-gray-700 hover:bg-gray-800 text-white"
              >
                <Upload className="h-4 w-4" />
                Publish
              </Button>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  Use these controls to re-validate assets, perform a full preview reload, or publish your app.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Publish Application</DialogTitle>
            <DialogDescription className="text-gray-400">
              Review and confirm the publish slug for your application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-white">
                Publish Slug
              </Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="my-app-name"
                className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-500"
                disabled={isPublishing}
              />
              <p className="text-xs text-gray-400">
                5-50 characters; only letters, numbers, and hyphens.
              </p>
              {error && (
                <p className="text-xs text-red-400 mt-1">
                  {error}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsPublishDialogOpen(false);
                setSlug('');
                setError(undefined);
              }}
              disabled={isPublishing}
              className="bg-gray-950 border-gray-700 hover:bg-gray-800 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isPublishing || !slug}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPublishing ? 'Publishing...' : 'Publish'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
