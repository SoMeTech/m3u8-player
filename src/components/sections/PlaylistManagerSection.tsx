'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Download, Upload, Trash2, Edit, Plus } from 'lucide-react';

interface Playlist {
  id: string;
  name: string;
  urls: string[];
  createdAt: Date;
}

export function PlaylistManagerSection() {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      urls: [],
      createdAt: new Date()
    };

    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
  };

  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  const features = [
    {
      icon: Plus,
      titleKey: 'playlistManager.features.create.title',
      descKey: 'playlistManager.features.create.description',
      defaultTitle: 'Create Playlists',
      defaultDesc: 'Organize your M3U8 streams into custom playlists'
    },
    {
      icon: Edit,
      titleKey: 'playlistManager.features.edit.title',
      descKey: 'playlistManager.features.edit.description',
      defaultTitle: 'Edit Playlists',
      defaultDesc: 'Modify playlist names and manage stream URLs'
    },
    {
      icon: Download,
      titleKey: 'playlistManager.features.export.title',
      descKey: 'playlistManager.features.export.description',
      defaultTitle: 'Export Playlists',
      defaultDesc: 'Download playlists as M3U or JSON files'
    },
    {
      icon: Upload,
      titleKey: 'playlistManager.features.import.title',
      descKey: 'playlistManager.features.import.description',
      defaultTitle: 'Import Playlists',
      defaultDesc: 'Import existing M3U or JSON playlist files'
    },
    {
      icon: PlayCircle,
      titleKey: 'playlistManager.features.preview.title',
      descKey: 'playlistManager.features.preview.description',
      defaultTitle: 'Preview Streams',
      defaultDesc: 'Test streams directly from your playlists'
    },
    {
      icon: Trash2,
      titleKey: 'playlistManager.features.delete.title',
      descKey: 'playlistManager.features.delete.description',
      defaultTitle: 'Delete Playlists',
      defaultDesc: 'Remove unwanted playlists with one click'
    }
  ];

  return (
    <section id="playlist-manager" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-purple-500/10 text-purple-500 border-purple-500/20"
          >
            {t('playlistManager.badge') || 'Playlist Management'}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('playlistManager.pageTitle') || 'M3U8 Playlist Manager'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('playlistManager.subtitle') || 'Create, organize, and manage your M3U8 streaming playlists with ease'}
          </p>
        </div>

        {/* Create Playlist Form */}
        <Card className="mb-12 border-2 border-purple-500/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-purple-500" />
              {t('playlistManager.createPlaylist.title') || 'Create New Playlist'}
            </CardTitle>
            <CardDescription>
              {t('playlistManager.createPlaylist.description') || 'Enter a name for your new playlist'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder={t('playlistManager.createPlaylist.placeholder') || 'Enter playlist name...'}
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                className="flex-1"
              />
              <Button
                onClick={handleCreatePlaylist}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('playlistManager.createPlaylist.button') || 'Create Playlist'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Playlists Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6">
            {t('playlistManager.yourPlaylists.title') || 'Your Playlists'}
          </h3>
          {playlists.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <PlayCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground text-center">
                  {t('playlistManager.yourPlaylists.empty') || 'No playlists yet. Create your first playlist to get started!'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <Card key={playlist.id} className="group hover:shadow-lg transition-all hover:border-purple-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{playlist.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {playlist.urls.length}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {t('playlistManager.playlist.created') || 'Created'}: {playlist.createdAt.toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        {t('playlistManager.playlist.edit') || 'Edit'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <PlayCircle className="mr-2 h-4 w-4" />
                        {t('playlistManager.playlist.play') || 'Play'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            {t('playlistManager.featuresSection.title') || 'Playlist Features'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-4 rounded-full bg-purple-500/10">
                        <Icon className="h-8 w-8 text-purple-500" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">
                        {t(feature.titleKey) || feature.defaultTitle}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {t(feature.descKey) || feature.defaultDesc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
