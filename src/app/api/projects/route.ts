/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newProject = await prisma.project.create({
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

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}