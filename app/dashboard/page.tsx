"use client";

import { useState } from "react";

interface Debate {
  id: string;
  title: string;
  description: string;
  author: string;
  timestamp: string;
  comments: number;
  proVotes: number;
  conVotes: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"debates" | "topics" | "forums">("debates");

  // Mock data
  const [debates, setDebates] = useState<Debate[]>([
    {
      id: "1",
      title: "Should AI be regulated?",
      description: "With the rapid advancement of artificial intelligence, should governments implement regulations to ensure safe development?",
      author: "TechEnthusiast",
      timestamp: "2 hours ago",
      comments: 24,
      proVotes: 45,
      conVotes: 32,
    },
    {
      id: "2",
      title: "Remote work vs Office work",
      description: "Discuss the pros and cons of remote work compared to traditional office environments.",
      author: "WorkLifeBalance",
      timestamp: "5 hours ago",
      comments: 56,
      proVotes: 78,
      conVotes: 41,
    },
  ]);

  const [hotTopics, setHotTopics] = useState<Debate[]>([
    {
      id: "3",
      title: "Climate Change Solutions",
      description: "What are the most effective ways to combat climate change on a global scale?",
      author: "EcoWarrior",
      timestamp: "1 hour ago",
      comments: 89,
      proVotes: 156,
      conVotes: 23,
    },
    {
      id: "4",
      title: "Universal Basic Income",
      description: "Should countries implement universal basic income for all citizens?",
      author: "EconoFreak",
      timestamp: "3 hours ago",
      comments: 67,
      proVotes: 92,
      conVotes: 78,
    },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    { id: "1", author: "JaneDoe", content: "Great point! I think regulation is necessary but balanced.", timestamp: "1 hour ago" },
    { id: "2", author: "JohnSmith", content: "Innovation should not be stifled by over-regulation.", timestamp: "45 min ago" },
  ]);

  const [newDebate, setNewDebate] = useState({ title: "", description: "" });
  const [newComment, setNewComment] = useState("");

  const handleCreateDebate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDebate.title || !newDebate.description) return;

    const debate: Debate = {
      id: Date.now().toString(),
      title: newDebate.title,
      description: newDebate.description,
      author: "You",
      timestamp: "Just now",
      comments: 0,
      proVotes: 0,
      conVotes: 0,
    };

    setDebates([debate, ...debates]);
    setNewDebate({ title: "", description: "" });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
      timestamp: "Just now",
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-gray-900">Vent</a>
            <nav className="flex gap-4">
              <a href="/dashboard" className="text-blue-600 font-medium">Dashboard</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900">Profile</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("debates")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === "debates"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Post Debates
            </button>
            <button
              onClick={() => setActiveTab("topics")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === "topics"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Hot Topics
            </button>
            <button
              onClick={() => setActiveTab("forums")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === "forums"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Debate Forums
            </button>
          </nav>
        </div>

        {/* Post Debates Tab */}
        {activeTab === "debates" && (
          <div className="space-y-6">
            {/* Create Debate Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Start a New Debate</h2>
              <form onSubmit={handleCreateDebate} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Debate Topic
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newDebate.title}
                    onChange={(e) => setNewDebate({ ...newDebate, title: e.target.value })}
                    placeholder="e.g., Should AI be regulated?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newDebate.description}
                    onChange={(e) => setNewDebate({ ...newDebate, description: e.target.value })}
                    placeholder="Describe the topic and context..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Post Debate
                </button>
              </form>
            </div>

            {/* Recent Debates */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Debates</h2>
              <div className="space-y-4">
                {debates.map((debate) => (
                  <div key={debate.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{debate.title}</h3>
                        <p className="mt-2 text-gray-600">{debate.description}</p>
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                          <span>By {debate.author}</span>
                          <span>•</span>
                          <span>{debate.timestamp}</span>
                          <span>•</span>
                          <span>{debate.comments} comments</span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <div className="text-center">
                          <div className="text-green-600 font-semibold">{debate.proVotes}</div>
                          <div className="text-xs text-gray-500">PRO</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-600 font-semibold">{debate.conVotes}</div>
                          <div className="text-xs text-gray-500">CON</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hot Topics Tab */}
        {activeTab === "topics" && (
          <div className="space-y-6">
            {/* Comment Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Join the Discussion</h2>
              <form onSubmit={handleAddComment} className="space-y-4">
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Add Your Comment
                  </label>
                  <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Post Comment
                </button>
              </form>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Comments</h2>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Topics List */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending Topics</h2>
              <div className="space-y-4">
                {hotTopics.map((topic) => (
                  <div key={topic.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">HOT</span>
                          <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                        </div>
                        <p className="text-gray-600">{topic.description}</p>
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                          <span>By {topic.author}</span>
                          <span>•</span>
                          <span>{topic.timestamp}</span>
                          <span>•</span>
                          <span>{topic.comments} comments</span>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <div className="text-center">
                          <div className="text-green-600 font-semibold">{topic.proVotes}</div>
                          <div className="text-xs text-gray-500">PRO</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-600 font-semibold">{topic.conVotes}</div>
                          <div className="text-xs text-gray-500">CON</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Debate Forums Tab */}
        {activeTab === "forums" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Enter the Debate Arena</h2>
              <p className="text-blue-100">
                Engage in structured debates with PRO and CON arguments. Vote on the most compelling points.
              </p>
            </div>

            {/* Active Forums */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Debate Forums</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...debates, ...hotTopics].map((forum) => (
                  <div key={forum.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-xs text-gray-500 font-medium">LIVE</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{forum.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{forum.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-gray-600">{forum.proVotes} PRO</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          <span className="text-sm text-gray-600">{forum.conVotes} CON</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                        Join Debate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600 mt-1">Active Debates</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-green-600">156</div>
                <div className="text-sm text-gray-600 mt-1">Participants</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">892</div>
                <div className="text-sm text-gray-600 mt-1">Arguments Made</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
