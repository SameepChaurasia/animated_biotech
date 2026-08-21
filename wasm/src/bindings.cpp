#include <emscripten/bind.h>
#include "alignment.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(biotech_module) {
    value_object<AlignmentOutput>("AlignmentOutput")
        .field("aligned_seq1", &AlignmentOutput::aligned_seq1)
        .field("aligned_seq2", &AlignmentOutput::aligned_seq2)
        .field("match_line", &AlignmentOutput::match_line)
        .field("score", &AlignmentOutput::score)
        .field("identity_percent", &AlignmentOutput::identity_percent)
        .field("gaps", &AlignmentOutput::gaps);

    class_<SequenceAligner>("SequenceAligner")
        .constructor<int, int, int>()
        .function("global_align", &SequenceAligner::global_align);
}
