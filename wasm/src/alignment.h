#ifndef ALIGNMENT_H
#define ALIGNMENT_H

#include <string>
#include <vector>

struct AlignmentOutput {
    std::string aligned_seq1;
    std::string aligned_seq2;
    std::string match_line;
    int score;
    double identity_percent;
    int gaps;
};

class SequenceAligner {
public:
    SequenceAligner(int match = 2, int mismatch = -1, int gap = -2);

    AlignmentOutput global_align(const std::string& seq1, const std::string& seq2);
    AlignmentOutput local_align(const std::string& seq1, const std::string& seq2);

private:
    int match_score;
    int mismatch_penalty;
    int gap_penalty;
};

#endif // ALIGNMENT_H
