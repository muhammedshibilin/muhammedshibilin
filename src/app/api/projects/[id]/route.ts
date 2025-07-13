/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        detailedDescription: body.detailedDescription,
        technologies: body.technologies,
        features: body.features,
        challenges: body.challenges,
        solutions: body.solutions,
        liveUrl: body.liveUrl,
        githubUrl: body.githubUrl,
        imageUrl: body.imageUrl,
        role: body.role,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}