const express = require("express");
const Document = require("../Models/DocumentModel");
const { Auth } = require("../Middleware/Auth");
const DocumentRoute = express.Router();

// Create Document (WYSIWYG content)
DocumentRoute.post("/create", Auth, async (req, res) => {
  const { title, content, visibility, mentions } = req.body;

  try {
    const doc = await Document.create({
      title,
      content,
      author: req.user.id,
      visibility,
      mentions
    });

    res.send({ msg: "Document created", doc });
  } catch (err) {
    res.status(500).send({ msg: "Error creating document", error: err.message });
  }
});

// Document Listing
DocumentRoute.get("/my-documents", Auth, async (req, res) => {
  const userId = req.user.id;

  try {
    console.log("Fetching documents for user:", userId);

    const docs = await Document.find({
      $or: [
        { author: userId },
        { sharedWith: { $elemMatch: { user: userId } } },
        { visibility: "public" }
      ]
    })
    .populate("author", "-Password") // ✅ Correct populate
    .sort({ updatedAt: -1 });

    res.send(docs);

  } catch (err) {
    console.error("❌ Error in /my-documents:", err);
    res.status(500).send({ msg: "Server error while fetching documents" });
  }
});

DocumentRoute.post("/:id",Auth, async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Document.findById(id);
    if (!doc) {
      return res.status(404).send({ msg: "Document not found" });
    }

   if (doc.author.toString() !== req.user.id) {
  return res.status(403).send({ msg: "session Expired login again" }); // ✅ proper status
}

    res.send(doc);
  } catch (err) {
    console.error("Error fetching document:", err);
    res.status(500).send({ msg: "Server error" });
  }
});



// Auto-save editing
DocumentRoute.patch("/update/:id", Auth, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const doc = await Document.findById(id);
  if (!doc) return res.status(404).send({ msg: "Document not found" });

  if (doc.author.toString() !== req.user.id) {
    return res.status(403).send({ msg: "Not authorized" });
  }

  doc.content = content;
  await doc.save();

  res.send({ msg: "Document updated" });
});

// Global Search
DocumentRoute.get("/search", Auth, async (req, res) => {
    console.log(req.query.q)
  const query = req.query.q;
  const docs = await Document.find({
    $text: { $search: query },
    $or: [
      { author: req.user.id },
      { sharedWith: { $elemMatch: { user: req.user.id } } },
      { visibility: "public" }
    ]
  });

  res.send(docs);
});

module.exports = { Document: DocumentRoute };
